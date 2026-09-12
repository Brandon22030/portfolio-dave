import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";

export function useTable(table, defaultRows = [], orderBy = "order_index", ascending = true) {
  const [rows, setRows] = useState(defaultRows);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = orderBy
        ? supabase.from(table).select("*").order(orderBy, { ascending })
        : supabase.from(table).select("*");
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      if (data?.length) setRows(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [table, orderBy, ascending]);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`${table}-changes`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => refresh())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [refresh, table]);

  const sortRows = useCallback(
    (list) => {
      if (!orderBy) return list;
      const dir = ascending ? 1 : -1;
      return [...list].sort((a, b) => (a[orderBy] > b[orderBy] ? dir : a[orderBy] < b[orderBy] ? -dir : 0));
    },
    [orderBy, ascending]
  );

  async function add(record) {
    const { data, error: insertError } = await supabase.from(table).insert(record).select().single();
    if (insertError) throw insertError;
    setRows((prev) => sortRows([...prev, data]));
    return data;
  }

  async function update(id, updates) {
    const { data, error: updateError } = await supabase.from(table).update(updates).eq("id", id).select().single();
    if (updateError) throw updateError;
    setRows((prev) => sortRows(prev.map((r) => (r.id === id ? data : r))));
    return data;
  }

  async function remove(id) {
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    if (deleteError) throw deleteError;
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return { rows, loading, error, refresh, add, update, remove, setRows };
}
