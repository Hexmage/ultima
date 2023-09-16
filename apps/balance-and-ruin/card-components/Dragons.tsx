import { Card } from "@ff6wc/ui";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagSubflagSelect } from "~/components/FlagSubflagSelect/FlagSubflagSelect";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";

const battleOptions = [
  {
    defaultValue: true,
    flag: "-bbs",
    helperText: "Boss battles are shuffled (No repeats)",
    label: "Shuffled",
    isStatic: true,
  },
  {
    defaultValue: true,
    flag: "-bbr",
    helperText: "Boss battles are randomized (Possible repeats)",
    label: "Random",
    isStatic: true,
  },
];

const SHUFFLE_DRAGONS = {
  defaultValue: "shuffle",
  flag: "-drloc",
  helperText: "Dragons battles are shuffled amongst themselves",
  label: "Shuffled",
  isStatic: true,
};
const dragonOptions = [
  {
    defaultValue: "original",
    flag: "-drloc",
    helperText: "Dragons battles are unchanged",
    label: "Original",
    isStatic: true,
  },
  SHUFFLE_DRAGONS,
  {
    defaultValue: "mix",
    flag: "-drloc",
    helperText:
      "Dragons are added to the general boss pool. If boss battles are original, they will shuffle amongst themselves",
    label: "Mixed",
    isStatic: true,
  },
];

const MIX_STATUES = {
  defaultValue: "mix",
  flag: "-stloc",
  helperText:
    "Doom, Goddess, and Poltrgeist are mixed into the general boss pool. If boss battles are original, they will shuffle amongst themselves",
  label: "Mixed",
  isStatic: true,
};
const statueOptions = [
  {
    defaultValue: "original",
    flag: "-stloc",
    helperText:
      "Doom, Goddess, and Poltrgeist are fought in their original locations",
    label: "Original",
    isStatic: true,
  },
  {
    defaultValue: "shuffle",
    flag: "-stloc",
    helperText: "Doom, Goddess, and Poltrgeist are shuffled amongst themselves",
    label: "Shuffled",
    isStatic: true,
  },
  MIX_STATUES,
];

export const Dragons = () => {
  return (
    <Card title={"Bosses"}>
      <CardColumn>
        <FlagSubflagSelect
          defaultSelected={SHUFFLE_DRAGONS}
          label="Dragon Battles"
          options={dragonOptions}
        />
        <FlagSwitch flag="-de" label="Dragon Experience" />
      </CardColumn>
    </Card>
  );
};
