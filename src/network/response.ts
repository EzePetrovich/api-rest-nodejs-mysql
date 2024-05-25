import { Response } from 'express';

type ResponseProps = {
  res?: Response;
  msg?: string;
  data?: any;
  status?: number;
};

type BodyResponse = {
  msg?: string;
  data?: any;
};

export const success = ({
  res,
  msg = '',
  data,
  status = 200,
}: ResponseProps) => {
  if (!res) throw new Error('Success response is null.');
  const body: BodyResponse = { msg };
  if (data) body.data = data;
  res.status(status).send({
    error: false,
    status,
    body,
  });
};

export const error = ({
  res,
  msg = 'Error interno',
  data,
  status = 500,
}: ResponseProps) => {
  if (!res) throw new Error('Error response is null.');
  const body: BodyResponse = { msg };
  if (data) body.data = data;
  res.status(status).send({
    error: true,
    status,
    body,
  });
};
