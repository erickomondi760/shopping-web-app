import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <h4 className="text-4xl capitalize">An error has been encountered!</h4>
  );
};
export default ErrorElement;
