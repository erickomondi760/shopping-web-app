import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text }) => {
  const navigate = useNavigation();

  const isLoading = navigate.state === "submitting";
  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner">Loading...</span>
        ) : (
          text || "Submit"
        )}
      </button>
    </div>
  );
};
export default SubmitButton;
