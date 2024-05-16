import { useAppSelector } from "@store";
import { Modal1, Modal2, Modal3 } from "views/modals";

export const ModalContainer: React.FC = (): JSX.Element => {
  const { modalKey } = useAppSelector((state) => state.app);

  return (
    <>
      {modalKey === "modal1" && <Modal1 />}

      {modalKey === "modal2" && <Modal2 />}

      {modalKey === "modal3" && <Modal3 />}
    </>
  );
};
