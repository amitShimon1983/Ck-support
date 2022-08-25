import React, { useState } from 'react';
// import { Persona, PersonaSize, Tooltip, DirectionalHint } from '@harmon.ie/collabria-frontend-storybook';

const CustomPersona = ({ attributes }: { attributes: any }) => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <div>Custom Persona</div>
    // <Tooltip content={attributes.emailAddress} directionalHint={DirectionalHint.topCenter}>
    //   <Persona
    //     styles={{ root: { cursor: 'pointer' } }}
    //     size={PersonaSize.size32}
    //     search="Customizations"
    //     imageUrl={`https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-${
    //       value ? 'female' : 'male'
    //     }.png`}
    //     onClick={() => setValue(!value)}
    //   />
    // </Tooltip>
  );
};

export default CustomPersona;
