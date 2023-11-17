import { Card, CardBody } from 'reactstrap';

const StatsHorizontal = ({ icon, color, stats, renderStats, statTitle, className, statsMargin }) => {
  return (
    <Card className="h-100 ">
      <CardBody className={`d-flex justify-content-between align-items-center h-100 ${className}`}>
        <div className="d-flex  flex-column">
          <div>
            {renderStats ? (
              renderStats
            ) : (
              <h2 className={`fw-bolder ${statsMargin ? statsMargin : 'mb-0'}`}>
                {stats}
              </h2>
            )}

            <p className='card-text'>{statTitle}</p>
          </div>
        </div>
        <div className={`avatar avatar-stats p-50 m-0 ${color ? `bg-light-${color}` : 'bg-light-primary'}`}>
          <div className='avatar-content'>{icon}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsHorizontal;
