export interface CardUserBeFoundProps {
  title: string;
  text: string;
}

const CardUserBeFound = ({ title, text }: CardUserBeFoundProps) => (
  <div className='alert alert-warning' role='alert'>
    <h4 className='alert-heading'>OOOPS...</h4>
    <hr></hr>
    <p className='mb-0'>
      <p>The user could not be found, try again</p>
    </p>
  </div>
);

export { CardUserBeFound };
