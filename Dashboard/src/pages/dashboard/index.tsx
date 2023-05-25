import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';

function Page() {
  return (
    <>
      <Component.Title>Servers</Component.Title>
      <div>Test</div>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
