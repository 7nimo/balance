export {}
// import React from 'react';
// import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

// type FormProps<TFormValues> = {
//   defaultValues: TFormValues;
//   onSubmit: SubmitHandler<TFormValues>;
//   children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
// };

// export const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
//   defaultValues,
//   children,
//   onSubmit,
// }: FormProps<TFormValues>): any => {
//   const methods = useForm<TFormValues>({ defaultValues });
//   const { handleSubmit } = methods;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {React.Children.map(children, (child) => {
//         return child.props.name
//           ? React.createElement(child.type, {
//               ...{
//                 ...child.props,
//                 register: methods.register,
//                 key: child.props.name,
//               },
//             })
//           : child;
//       })}
//     </form>
//   );
// };
