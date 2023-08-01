export function Button({ children, onClick, classNames }: any) {
  return (
    <>
      <button className={classNames} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
export default Button;
