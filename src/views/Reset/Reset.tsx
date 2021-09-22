import { useLocation } from 'react-router';
import { useSearchParams } from '../../hooks';

export interface ResetProps {}

const Reset: React.FC<ResetProps> = () => {
  const params = useSearchParams(useLocation().search);

  return <div>Reset token is: {params.t}</div>;
};

export default Reset;
