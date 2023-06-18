interface channels {
  id: string;
  parent_id: string;
  name: string;
  position: number;
}

export function getChannelOptions(
  allChannels: channels[],
  channels: channels[],
) {
  let options = [];
  for (const channel of channels) {
    const category = allChannels.find(
      (c: { id: string }) => c.id === channel.parent_id,
    );
    if (!category) {
      options.push({
        position: -1,
        key: '#' + channel.name,
        value: channel.id,
      });
      continue;
    }
    options.push({
      position: category.position,
      key: { title: '#' + channel.name, description: category.name },
      value: channel.id,
    });
  }

  options = options.sort((a, b) => {
    if (a.position === b.position) {
      return a.key < b.key ? -1 : 1;
    }
    return a.position - b.position;
  });

  options = options.map((option) => ({
    key: option.key,
    value: option.value,
  }));

  return options;
}
