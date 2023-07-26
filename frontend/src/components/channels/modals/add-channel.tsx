import { Button, Form, Modal } from 'react-bootstrap';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

interface AddChannelModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const AddChannelModal = (props: AddChannelModalProps) => {
  const [name, setName] = useState('');

  const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setName('');
      props.onSubmit(name);
    },
    [name, props]
  );

  const handleClose = useCallback(() => {
    setName('');
    props.onClose();
  }, [props]);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Channel name</Form.Label>
            <Form.Control autoFocus type='text' placeholder='channel' onChange={handleChangeName} value={name} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
