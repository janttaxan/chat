import { Button, Form, Modal } from 'react-bootstrap';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Channel } from 'core/entities';

interface RenameChannelModalProps {
  show: boolean;
  workingChannel: Optional<Channel>;
  onClose: () => void;
  onSubmit: (channelId: number, newName: string) => void;
}

export const RenameChannelModal = (props: RenameChannelModalProps) => {
  const [newName, setNewName] = useState('');

  const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewName(value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setNewName('');
      if (props.workingChannel) {
        props.onSubmit(props.workingChannel.id, newName);
      }
    },
    [newName, props]
  );

  const handleClose = useCallback(() => {
    setNewName('');
    props.onClose();
  }, [props]);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Channel name</Form.Label>
            <Form.Control autoFocus type='text' placeholder='channel' onChange={handleChangeName} value={newName} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
