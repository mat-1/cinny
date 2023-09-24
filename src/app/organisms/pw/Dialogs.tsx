import React from 'react';

import ReadReceipts from '../read-receipts/ReadReceipts';
import ProfileViewer from '../profile-viewer/ProfileViewer';
import ShortcutSpaces from '../shortcut-spaces/ShortcutSpaces';
import SpaceAddExisting from '../../molecules/space-add-existing/SpaceAddExisting';
import Search from '../search/Search';
import ViewSource from '../view-source/ViewSource';
import CreateRoom from '../create-room/CreateRoom';
import JoinAlias from '../join-alias/JoinAlias';
import EmojiVerification from '../emoji-verification/EmojiVerification';

import ReusableDialog from '../../molecules/dialog/ReusableDialog';

function Dialogs() {
  return (
    <>
      <ReadReceipts />
      <ViewSource />
      <ProfileViewer />
      <ShortcutSpaces />
      <CreateRoom />
      <JoinAlias />
      <SpaceAddExisting />
      <Search />
      <EmojiVerification />

      <ReusableDialog />
    </>
  );
}

export default Dialogs;
