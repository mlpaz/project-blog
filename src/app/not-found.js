import styles from "./not-found.module.css";
import { BLOG_TITLE } from "@/constants";
export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2>Not Found</h2>
      <p>
        Could not find requested resource. Please check the URL and try again.
      </p>
    </div>
  );
}
