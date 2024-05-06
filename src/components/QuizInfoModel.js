import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactMarkdown from 'react-markdown';

function QuizInfoModal({show, onHide, description}) {
  return (
    <Modal
      data-testid="quiz-info-modal" 
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Instructions
        </Modal.Title> 
      </Modal.Header>
      <Modal.Body>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuizInfoModal;