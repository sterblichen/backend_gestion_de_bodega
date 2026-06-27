const z = require("zod");

const registerSchme = z.object({
  nameUser: z
    .string()
    .min(1, { error: "Campo obligatorio" })
    .min(3, { error: "Minimo 3 caracteres" })
    .trim(),
  lastnameUser: z
    .string()
    .min(1, { error: "Campo obligatorio" })
    .min(3, { error: "Minimo 3 caracteres" })
    .trim(),
  emailUser: z
    .email({ error: "Formato incorrecto del email" })
    .trim(),
  passwordUser: z
    .string()
    .min(1, { error: "Campo obligatorio" })
    .min(8, { error: "Minimo 8 caracteres" })
    .trim(),
  roleUser: z
    .number({ error: "Coloque el formato correcto" })
    .min(1, { error: "Campo Obligatorio" }),
});

const loginSchema = z.object({
  emailUser: z
    .email({ error: "Formato incorrecto del email" })
    .trim(),
  passwordUser: z
    .string()
    .min(1, { error: "Campo Obligatorio" })
    .min(8, { error: "Minimo 9 caracteres" })
    .trim(),
});

module.exports = {
  registerSchme,
  loginSchema,
};
