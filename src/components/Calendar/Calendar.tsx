import CalendarControl from './CalendarControl';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import Loader from '../Loader';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadEvents } from '../../redux/actions/events';
import { eventsLoadingSelector } from '../../redux/selectors/events';
import { RootState } from '../../redux/reducer';

interface StateProps {
  loading: boolean;
}

interface DispatchProps {
  loadEvents: () => void;
}

type Props = StateProps & DispatchProps;

const Calendar = ({ loading, loadEvents }: Props) => {
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  if (loading) return <Loader />;
  return (
    <>
      <CalendarHeader />
      <main>
        <CalendarControl />
        <CalendarTable />
      </main>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: eventsLoadingSelector(state),
});

const mapDispatchToProps = {
  loadEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
