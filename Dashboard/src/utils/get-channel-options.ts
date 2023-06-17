interface channels {
  id: string;
  parent_id: string;
  name: string;
}

export function getChannelOptions(
  allChannels: channels[],
  channels: channels[],
) {
  const options = [];
  for (const channel of channels) {
    const category = allChannels.find(
      (c: { id: string }) => c.id === channel.parent_id,
    );
    if (!category) {
      options.push({
        key: '#' + channel.name,
        value: channel.id,
      });
      continue;
    }
    options.push({
      key: { title: '#' + channel.name, description: category.name },
      value: channel.id,
    });
  }
  return options;
}
