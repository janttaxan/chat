import styles from './channels.module.css';

import { Button } from 'react-bootstrap';
import { useCallback } from 'react';

import { ChatSocketHook } from 'core/hooks/chat-socket';
import { Channel } from 'core/entities';

import { AddChannelModal } from 'components/channels/modals/add-channel';
import { RemoveChannelModal } from 'components/channels/modals/remove-channel';
import { RenameChannelModal } from 'components/channels/modals/rename-channel';
import { useChannels, WizardMode } from 'components/channels/hooks/channels';

interface ChannelsProps {
  chatSocket: ChatSocketHook;
}

export const Channels = ({ chatSocket }: ChannelsProps) => {
  const channelsHook = useChannels(chatSocket);

  const handleAddChannel = useCallback(() => {
    channelsHook.openModal(WizardMode.add);
  }, [channelsHook]);

  const handleRemoveChannel = useCallback(
    (channel: Channel) => {
      channelsHook.openModal(WizardMode.remove, channel);
    },
    [channelsHook]
  );

  const handleRenameChannel = useCallback(
    (channel: Channel) => {
      channelsHook.openModal(WizardMode.rename, channel);
    },
    [channelsHook]
  );

  return (
    <div className={styles.root}>
      <h3>Каналы</h3>
      <Button onClick={handleAddChannel}>Создать канал</Button>
      <ul>
        {channelsHook.channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            currentChannelId={channelsHook.currentChannelId}
            onClick={channelsHook.changeCurrentChannel}
            onRemove={handleRemoveChannel}
            onRename={handleRenameChannel}
          />
        ))}
      </ul>
      <AddChannelModal
        show={channelsHook.mode === WizardMode.add}
        onClose={channelsHook.closeModal}
        onSubmit={channelsHook.addChannel}
      />
      <RenameChannelModal
        workingChannel={channelsHook.workingChannel}
        show={channelsHook.mode === WizardMode.rename}
        onClose={channelsHook.closeModal}
        onSubmit={channelsHook.renameChannel}
      />
      <RemoveChannelModal
        workingChannel={channelsHook.workingChannel}
        show={channelsHook.mode === WizardMode.remove}
        onClose={channelsHook.closeModal}
        onRemove={channelsHook.removeChannel}
      />
    </div>
  );
};

interface ChannelProps {
  channel: Channel;
  currentChannelId: number;
  onClick: (channelId: number) => void;
  onRemove: (channel: Channel) => void;
  onRename: (channel: Channel) => void;
}

function ChannelItem(props: ChannelProps) {
  const handleClick = () => {
    props.onClick(props.channel.id);
  };

  const handleRemove = () => {
    props.onRemove(props.channel);
  };

  const handleRename = () => {
    props.onRename(props.channel);
  };

  return (
    <li>
      <span onClick={handleClick}>
        {props.currentChannelId === props.channel.id ? '—' : ''}
        {props.channel.name}
      </span>
      {props.channel.removable && (
        <Button variant='outline-dark' size='sm' onClick={handleRename}>
          rename
        </Button>
      )}
      {props.channel.removable && (
        <Button variant='outline-danger' size='sm' onClick={handleRemove}>
          X
        </Button>
      )}
    </li>
  );
}
