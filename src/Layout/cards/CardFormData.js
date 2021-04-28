import  React  from "react";

export default function CardFormData({ front, setFront, back, setBack }){
  return (
      <div>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            className="form-control"
            placeholde="Front side of card"
            rows="3"
            required
            value={front}
            onChange={({ target: { value } }) => setFront(value)}
          />
          <small className="form-text text-muted">
            Please provide a question
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            className="form-control"
            placeholder="Back side of the card"
            rows="3"
            required
            value={back}
            onChange={({ target: { value } }) => setBack(value)}
          />
        </div>
      </div>
          
  );
};
