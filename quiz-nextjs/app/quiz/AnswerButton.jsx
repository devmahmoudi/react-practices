/**
 * All fetching requests stores here
 */
var fetchPool = {};

/**
 * Simulates fetching data from server with dynamic latency and promise base
 *
 * @param {any} res result which returns after latency simulate
 */
const fetchDataSimulator = (key, res) => {
  console.log(fetchPool);

  if (!fetchPool[key]) {
    const randDelay = (Math.floor(Math.random() * 5) + 1) * 1000;

    fetchPool[key] = {
      data: null,
      status: "pending",
      promise: new Promise((resolve) => {
        setTimeout(() => {
          fetchPool[key].data = res;
          fetchPool[key].status = "success";
          resolve();
        }, randDelay);
      }),
    };
  }

  return {
    read() {
      if (fetchPool[key].status == "pending") throw fetchPool[key].promise;
      else if (fetchPool[key].status == "success") return fetchPool[key].data;
    },
  };
};

/**
 *
 * @param {string} answer answer text
 * @param {boolean} isActive defines the button is active or not
 * @param {object} onClick onClick handler
 * @returns jsx
 */
export const AnswerButton = ({ answer, isActive, onClick }) => {
  const answerData = fetchDataSimulator(answer, answer).read();

  return (
    <li
      className={`boder-solid outline-1 p-2 rounded-lg cursor-pointer ${
        isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
      }`}
      onClick={onClick}
    >
      {answerData}
    </li>
  );
};
