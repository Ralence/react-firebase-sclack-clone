import React, { useState } from "react";
import mime from "mime-types";
import {
  Modal,
  Input,
  Button,
  Icon,
  ModalHeader,
  ModalContent,
  ModalActions,
} from "semantic-ui-react";

const FileModal = ({ modal, closeModal, uploadFile }) => {
  const [file, setFile] = useState("");

  const fileTypes = ["image/jpeg", "image/png"];

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const isGoodFileType = (fileName) => fileTypes.includes(mime.lookup(fileName));

  const handleSubmit = () => {
    if (file) {
      if (isGoodFileType(file.name)) {
        const metadata = {
          contentType: mime.lookup(file.name),
        };
        uploadFile(file, metadata);
        closeModal();
        setFile([]);
      }
    }
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <ModalHeader>Select an Image File</ModalHeader>
      <ModalContent>
        <Input
          fluid
          type="file"
          name="file"
          label="FileTypes; jpg, png"
          onChange={(e) => handleChange(e)}
        />
      </ModalContent>
      <ModalActions>
        <Button color="green" inverted onClick={() => handleSubmit()}>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default FileModal;
