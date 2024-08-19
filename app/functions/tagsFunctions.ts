import { Tag } from "@/data/AllTags";
import { v4 as uuidv4 } from "uuid";
import { Challenge } from "@/data/AllChallenges";
export function addTagFunction(
  inputName: string,
  allTags: Tag[],
  setAllTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  setOpenTagsWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const newTag: Tag = { _id: uuidv4(), name: inputName };
    setAllTags([...allTags, newTag]);
    setOpenTagsWindow(false);
  } catch (error) {
    console.log(error);
  }
}

export function editTagFunction(
  tagToEdit: string | null,
  inputTagName: string,
  allTags: Tag[],
  setAllTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  allChallenges: Challenge[],
  setAllChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>,
  setOpenTagWindow: React.Dispatch<React.SetStateAction<boolean>>,
  filterByTags: string[],
  setFilterByTags: React.Dispatch<React.SetStateAction<string[]>>
) {
  //1- Update the tag name in the Copy of all Tags Array
  const updateAllTags = allTags.map((tag) => ({
    ...tag,
    name: tag.name === tagToEdit ? inputTagName : tag.name,
  }));

  //2- Create a copy of all Challenges to update to tag in the challenges that uses the tag
  const updateAllChallenges = allChallenges.map((challenge) => ({
    ...challenge,
    tags: challenge.tags.map((tag) =>
      tag.toLocaleLowerCase() === tagToEdit?.toLowerCase() ? inputTagName : tag
    ),
  }));
  console.log(filterByTags);

  //3-Update the filterByTags as well
  const updateFilterByTags = filterByTags.map((tag) => {
    if (tag.toLocaleLowerCase() === tagToEdit?.toLocaleLowerCase()) {
      return inputTagName;
    }

    return tag;
  });

  setAllTags(updateAllTags);
  setAllChallenges(updateAllChallenges);
  setFilterByTags(updateFilterByTags);
  setOpenTagWindow(false);
}

export function deleteTagFunction(
  singleTag: { _id: string; name: string; isHovered: boolean },
  allTags: Tag[],
  setAllTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  allChallenges: Challenge[],
  setAllChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>,
  filterByTags: string[],
  setFilterByTags: React.Dispatch<React.SetStateAction<string[]>>
) {
  //1- Create a copy of the all Tags by Filter out the tag that we clicked on
  const allTagsCopy = allTags.filter((tag) => tag._id !== singleTag._id);

  //2 - Create a copy of the all Challenges by updating the tags array
  // in each challenge to remove the tag we clicked on
  const updateAllChallenges = allChallenges.map((challenge) => ({
    ...challenge,
    tags: challenge.tags.filter(
      (tag) => tag.toLocaleLowerCase() !== singleTag.name.toLocaleLowerCase()
    ),
  }));

  //3- Update all the challenges to reflect the change in the UI
  setAllChallenges(updateAllChallenges);

  //4- Update the allTags array to be reflected in the UI as well
  setAllTags(allTagsCopy);

  //5 - Update the filter by tags array
  const copyFilterByTags = filterByTags.filter((tag) => tag !== singleTag.name);
  setFilterByTags(copyFilterByTags);
}
