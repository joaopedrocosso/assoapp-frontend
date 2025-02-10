"use client";

import { useGlobalContext } from "@/app/context/store";
import styles from "./InfoModal.module.css";
import { useEffect, useState } from "react";

const InfoModal: React.FC = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { infoModalMessage } = useGlobalContext();

  useEffect(() => {
    console.log("Modal recarregado", infoModalMessage);
    // Quando o componente é montado, defina isVisible como true para acionar a animação
    setIsVisible(true);

    // Defina um temporizador para ocultar a div após algum tempo (por exemplo, 3 segundos)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Limpando o temporizador no desmonte do componente para evitar vazamentos de memória
    return () => clearTimeout(timer);
  }, [infoModalMessage]);

  return (
    <>
      <div
        className={`${isVisible ? styles.modal : styles.invisible} ${
          infoModalMessage.status !== 200 ? styles.bad : styles.ok
        }`}
      >
        <p>
          {infoModalMessage.status !== 200
            ? `Erro: ${infoModalMessage.message}`
            : infoModalMessage.message}
        </p>
      </div>
    </>
  );
};

export default InfoModal;
