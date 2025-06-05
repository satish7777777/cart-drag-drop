// 'use client';

// export default function ImageComponent() {
//   return (
//     <div
//       className="w-full h-full bg-cover bg-center rounded-xl"
//       style={{
//         backgroundImage: `url("https://v.wpimg.pl/ZTZkNzI0dTU7CThJZkt4IHhRbBMgEnZ2L0l0WGYBaGxqE2EcIFw_Jj8bIVQuQi8kOxw-VDlcdTUqAmEMeB8-PSkbIhswHz85OA4qVSxSaGJjXyhPZAk4Mm9GekJ-U3c1Y1p2V34JOTFsD3lIfQY7Y3gW")`,
//       }}
//     ></div>
//   );
// }

'use client';

import Image from 'next/image';

export default function ImageComponent() {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden">
      <Image
        src="https://v.wpimg.pl/ZTZkNzI0dTU7CThJZkt4IHhRbBMgEnZ2L0l0WGYBaGxqE2EcIFw_Jj8bIVQuQi8kOxw-VDlcdTUqAmEMeB8-PSkbIhswHz85OA4qVSxSaGJjXyhPZAk4Mm9GekJ-U3c1Y1p2V34JOTFsD3lIfQY7Y3gW"
        alt="Map Background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
