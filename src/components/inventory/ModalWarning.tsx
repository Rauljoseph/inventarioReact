import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalWarningStockProps{
    stock: number,
    name:string,
    isOpen: boolean
    onClose: () => void;
}

export const ModalWarningStock = (props: ModalWarningStockProps) => {
    
  return (
    <Modal show={props.isOpen} onHide={props.onClose} centered>

      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>El stock es bajo, quedan {props.stock} productos para {props.name}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
    
  );
};
