import styles from './channels.module.css';

import { channelsSelectors, selectCurrentChannelId, setCurrentChannelId } from 'core/redux/slices/channels-slice';
import { useDispatch, useSelector } from 'core/redux/store';

interface ChannelsProps {}

export const Channels = (props: ChannelsProps) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const handleChangeCurrentChannel = (id: number) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <div className={styles.root}>
      <h3>Каналы</h3>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => handleChangeCurrentChannel(channel.id)}>
            {currentChannelId === channel.id ? '—' : ''}
            {channel.name}
            {channel.removable ? ' X' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};
