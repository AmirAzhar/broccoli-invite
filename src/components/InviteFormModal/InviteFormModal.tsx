import React from "react";

// Lib
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";

// Components
import Modal from "../Modal";

// Types
import { InviteFormModalProps } from "./InviteFormModal.d";

const InviteFormModal: React.FC<InviteFormModalProps> = ({
  onClose,
  onSubmit,
  serverError,
  setServerError,
}) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters long")
      .required("Full name is required"),
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter a valid email address") // to enforce tld e.g. .com, .net, .org
      .email("Please enter a valid email address")
      .required("Email is required"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email")], "Emails must match")
      .required("Please confirm your email"),
  });

  const inputClass = (meta: FieldProps["meta"]) => {
    const baseClasses = "w-full rounded p-2 focus:outline-none transition-colors";
    const borderClasses =
      meta.touched && meta.error
        ? "focus:ring border-red-500 focus:ring-red-800 dark:border-red-300 dark:focus:ring-red-500"
        : "focus:ring border-gray-300 focus:ring-black dark:border-gray-500 dark:focus:ring-white";
    return `${baseClasses} border ${borderClasses}`;
  };

  return (
    <Modal onClose={onClose} title="Request an invite" showClose>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          confirmEmail: "",
        }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values, { setSubmitting }) => {
          setServerError(null);
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3" noValidate>
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <Field name="fullName">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    aria-required="true"
                    className={inputClass(meta)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="fullName"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                    aria-required="true"
                    className={inputClass(meta)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-300"
              />
            </div>
            <div>
              <label htmlFor="confirmEmail" className="sr-only">
                Confirm Email
              </label>
              <Field name="confirmEmail">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    id="confirmEmail"
                    type="email"
                    placeholder="Confirm Email"
                    aria-required="true"
                    className={inputClass(meta)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmEmail"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-300"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full mt-3 button sm:mt-6">
              {isSubmitting ? "Sending... Please wait..." : "Send"}
            </button>
            {serverError && (
              <p role="alert" className="mt-2 text-sm text-center text-red-600 dark:text-red-300">
                {serverError}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default InviteFormModal;
