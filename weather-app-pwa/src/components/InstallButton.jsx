import { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * The styled InstallButtonContainer component
 */
const InstallButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: auto auto;
  padding: 1rem;
`;

const InstallButtonComponent = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #00dc94;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function InstallButton() {
  /**
   * Store of install PWA prompt
   */
  const [installPrompt, setInstallPrompt] = useState(null);

  /**
   * Display button state
   */
  const [displayBtn, setDisplayBtn] = useState(false);

  /**
   * Add event listener for the BeforeInstallPrompt event
   */
  useEffect(() => {
    const handleInstall = (e) => {
      e.preventDefault();

      setInstallPrompt(e);

      setDisplayBtn(true);
    };

    // Listen for the browser's PWA install prompt
    window.addEventListener("beforeinstallprompt", handleInstall);

    // Cleanup correctly by removing the SAME event & handler
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstall);
    };
  }, []);

  /**
   * Install btn onclick handler
   */
  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((res) => {
        if (res.outcome === "accepted") {
          console.log("Congratulation Installing 🎉🎉🚀🚀");
          setDisplayBtn(false);
          setInstallPrompt(null);
        } else {
          console.log("User dismissed installation 🥺");
        }
      });
    }
  };

  if (!displayBtn) return null;

  return (
    <InstallButtonContainer>
      <InstallButtonComponent onClick={handleInstallClick}>
        نصب برنامه
      </InstallButtonComponent>
    </InstallButtonContainer>
  );
}
