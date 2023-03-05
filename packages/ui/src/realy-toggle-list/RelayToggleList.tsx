import Toggle from "../atoms/toggle";

type RelayInfo = {
  url: string;
  toggled: boolean;
  status?: "online" | "offline";
};

type Props = {
  relays: RelayInfo[];
  onRelayChange: (relay: string, toggled: boolean) => void;
};

const RelayToggleList = ({ relays, onRelayChange }: Props) => {
  return (
    <div className="dark:text-gray-100 text-gray-900 flex flex-col gap-y-4">
      {relays.map((relay) => (
        <div key={relay.url} className="flex gap-x-2 items-center">
          <Toggle
            initialState={relay.toggled}
            onChange={(t) => onRelayChange(relay.url, t)}
          />
          <span>{relay.url}</span>
        </div>
      ))}
    </div>
  );
};

export default RelayToggleList;
