import { Button, Modal } from 'react-bootstrap';
import { useCallback } from 'react';

import { Channel } from 'core/entities';

interface RemoveChannelModalProps {
  show: boolean;
  workingChannel: Optional<Channel>;
  onClose: () => void;
  onRemove: (id: number) => void;
}

export const RemoveChannelModal = (props: RemoveChannelModalProps) => {
  const handleSubmit = useCallback(() => {
    if (props.workingChannel) {
      props.onRemove(props.workingChannel.id);
    }
  }, [props]);

  if (!props.workingChannel) {
    return null;
  }
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Accept delete {props.workingChannel.name}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onClose}>
          Close
        </Button>
        <Button variant='danger' onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
