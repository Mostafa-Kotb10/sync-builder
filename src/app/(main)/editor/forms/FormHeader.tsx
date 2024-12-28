import React from "react";

const FormHeader = ({ heading, text }: { heading?: string; text?: string }) => {
  return (
    <div className="space-y-1.5 text-center">
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
};

export default FormHeader;
