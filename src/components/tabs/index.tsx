import styles from "./styles.module.scss";

export interface TabData {
  title: string;
  action?: () => void;
}

interface TabsProps {
  onClick: (tab: string) => void;
  activeTab: string;
  tabs: TabData[];
}

const Tabs = ({ tabs, onClick, activeTab }: TabsProps) => {
  return (
    <>
      <div className={styles.tabs}>
        {tabs.map(({ title, action }) => (
          <button
            onClick={() => {
              onClick(title);
              action?.();
            }}
            className={activeTab === title ? styles.active : ""}
          >
            {title}
          </button>
        ))}
      </div>
    </>
  );
};

export { Tabs };
