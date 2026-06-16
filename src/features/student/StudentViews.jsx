import { Resources } from "../../components/shared/Resources";
import { Messages } from "./Messages";
import { StudentHome } from "./StudentHome";
import { StudentRequestForm } from "./StudentRequestForm";
import { StudentSearch } from "./StudentSearch";
import { StudentSessions } from "./StudentSessions";
import { StudentTutorProfile } from "./StudentTutorProfile";

export function StudentViews(props) {
  const { view } = props;
  if (view === "search") return <StudentSearch {...props} />;
  if (view === "profile") return <StudentTutorProfile {...props} />;
  if (view === "request") return <StudentRequestForm {...props} />;
  if (view === "sessions") return <StudentSessions {...props} />;
  if (view === "resources") return <Resources resources={props.resources} />;
  if (view === "messages") return <Messages />;
  return <StudentHome {...props} />;
}
