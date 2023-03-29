import styles from "./ConversationCard.module.scss";
interface props {
  children: React.ReactNode;
  type: "left" | "right";
}

export default function ConversationCard(props: props) {
  return (
    <>
      {props.type === "left" ? (
        <div className={styles.left}>{props.children}</div>
      ) : (
        <div className={styles.right}>{props.children}</div>
      )}
    </>
  );
}
