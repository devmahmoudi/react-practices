import styled from "styled-components";

/**
 * Error card container
 */
const ErrorCardContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(253, 253, 253, 0.91);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

/**
 * Error icon
 */
const ErrorIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

/**
 * Error message
 */
const ErrorMessage = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

/**
 * Translate error message
 * @param {*} error 
 * @returns 
 */
const translateErrorMessage = (error) => {
  switch (error) {
    case "Request failed with status code 404":
      return "شهری با این نام یافت نشد";
    default:
      return error;
  }
}

/**
 * Error card
 * @param {string} error - The error message
 * @returns {React.ReactNode}
 */
const ErrorCard = ({ error }) => {
  return (
    <ErrorCardContainer>
        <ErrorMessage>{translateErrorMessage(error)}</ErrorMessage>
    </ErrorCardContainer>
  );
};

export default ErrorCard;