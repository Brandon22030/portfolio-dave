import { useInView } from "../hooks/useInView";

export default function Reveal({ children, delay = 0, style, as: Tag = "div", ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.2,.7,.3,1) ${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
