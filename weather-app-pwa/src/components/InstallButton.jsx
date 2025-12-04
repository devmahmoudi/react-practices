import { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * The styled InstallButtonContainer component
 */
const InstallButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InstallButtonComponent = styled.button`
  padding: 0.6rem 2.5rem;
  border-radius: 999px;
  background-color: #00dc94;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 8px 18px rgba(0, 220, 148, 0.6);
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
