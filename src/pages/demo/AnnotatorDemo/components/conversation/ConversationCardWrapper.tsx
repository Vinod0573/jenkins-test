import styles from "./ConversationCardWrapper.module.scss";
import ConversationCard from "./generic/ConversationCard";
interface props {
  messages: { type: "left" | "right"; component: React.ReactNode }[];
}
export default function ConversationCardWrapper(props: props) {
  return (
    <div className={styles.wrapper}>
      {props.messages.map((e, index) => {
        return (
          <div
            className={e.type === "left" ? styles.left : styles.right}
            key={index}
          >
            <ConversationCard type={e.type}> {e.component}</ConversationCard>
          </div>
        );
      })}
    </div>
  );
}
