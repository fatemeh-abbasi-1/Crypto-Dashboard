import React from "react";

import LabeledInput from "@/components/molecules/LabeledInput/LabeledInput";
import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import Title from "@/components/atoms/Title/Title";

const RegisterForm: React.FC = () => {
  return (
    <div className="max-w-md w-full mx-auto flex flex-col items-center">
      <Title variant="h1">Welcome!</Title>
      <Text size="small" className="mb-6 text-center">
        Use these awesome forms to login or create new account in your project
        for free.
      </Text>

      <form className="w-full space-y-4">
        <LabeledInput id="name" label="Name" placeholder="Your full name" />
        <LabeledInput
          id="email"
          label="Email"
          placeholder="Your email address"
        />
        <LabeledInput
          id="password"
          label="Password"
          type="password"
          placeholder="Your password"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-gray-400 text-sm">
            <input type="checkbox" className="accent-blue-500" />
            <span>Remember me</span>
          </label>
        </div>
        <Button size="large" className="w-full">
          Sign up
        </Button>
      </form>

      <div className="flex gap-2 mt-6">
        <Text>Already have an account?</Text>
        <Text className="font-bold">Sign In</Text>
      </div>
    </div>
  );
};

export default RegisterForm;
