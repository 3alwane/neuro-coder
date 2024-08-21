import { Challenge } from '@/data/AllChallenges';

import { toast } from 'react-hot-toast';

export function addNewChallenge(
  allChallenges: Challenge[],
  setAllChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>,
  newChallenge: Challenge,
  setOpenChallengeWindow: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    toast.success('The challenge has beeen added successfully');
    setAllChallenges([...allChallenges, newChallenge]);
    setOpenChallengeWindow(false);
  } catch (error) {}
}
