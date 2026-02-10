'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from '@/components/ui/toast';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import GradientOrb from '../components/GradientOrb';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères.')
    .max(50, 'Le nom doit contenir au plus 50 caractères.'),
  email: z.string().email('Veuillez entrer une adresse email valide.'),
  company: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères.')
    .max(100, 'Le nom de l\'entreprise doit contenir au plus 100 caractères.')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères.')
    .max(100, 'Le sujet doit contenir au plus 100 caractères.'),
  message: z
    .string()
    .min(20, 'Le message doit contenir au moins 20 caractères.')
    .max(1000, 'Le message doit contenir au plus 1000 caractères.'),
});

export default function ContactPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast(t('contact.form.success'), {
      description: t('contact.form.success.description'),
      position: 'bottom-right',
    });
    form.reset();
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <GradientOrb />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span
                className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                }`}
              >
                Contactez-nous
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Prêt à transformer votre entreprise ?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Discutons de vos projets et découvrons comment l'IA peut
              accélérer votre croissance.
            </motion.p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card
                className={`h-full ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/[0.02]'
                    : 'border-black/5 bg-white'
                }`}
              >
                <CardHeader>
                  <CardTitle
                    className={theme === 'dark' ? 'text-white' : 'text-black'}
                  >
                    Restons connectés
                  </CardTitle>
                  <CardDescription>
                    Suivez-nous sur nos réseaux sociaux pour les dernières
                    actualités.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* LinkedIn Link */}
                  <motion.a
                    href="https://www.linkedin.com/company/aiunivers"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/[0.02] hover:border-emerald-400/60 hover:bg-emerald-500/5'
                        : 'border-black/5 bg-gray-50/50 hover:border-emerald-400/60 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20'
                          : 'bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20'
                      }`}
                    >
                      <svg
                        className="w-6 h-6 text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                      >
                        LinkedIn
                      </p>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {t('contact.linkedin')}
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'text-gray-400 group-hover:text-emerald-400'
                          : 'text-gray-600 group-hover:text-emerald-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>

                  {/* Additional Info */}
                  <div
                    className={`space-y-4 pt-4 border-t ${
                      theme === 'dark' ? 'border-white/10' : 'border-black/5'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                      >
                        {t('contact.email')}
                      </p>
                      <a
                        href="mailto:contact@aiunivers.ai"
                        className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        contact@aiunivers.ai
                      </a>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                      >
                        {t('contact.location')}
                      </p>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {t('contact.location.value')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card
                className={`${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/[0.02]'
                    : 'border-black/5 bg-white'
                }`}
              >
                <CardHeader>
                  <CardTitle
                    className={theme === 'dark' ? 'text-white' : 'text-black'}
                  >
                    {t('contact.form.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('contact.form.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="contact-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FieldGroup>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <Controller
                          name="name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="contact-name">
                                {t('contact.form.name')}
                              </FieldLabel>
                              <Input
                                {...field}
                                id="contact-name"
                                aria-invalid={fieldState.invalid}
                                placeholder={t('contact.form.name.placeholder')}
                                autoComplete="name"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="contact-email">
                                {t('contact.form.email')}
                              </FieldLabel>
                              <Input
                                {...field}
                                id="contact-email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder={t('contact.form.email.placeholder')}
                                autoComplete="email"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                              )}
                            </Field>
                          )}
                        />
                      </div>

                      <Controller
                        name="company"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-company">
                              {t('contact.form.company')}
                            </FieldLabel>
                            <Input
                              {...field}
                              id="contact-company"
                              aria-invalid={fieldState.invalid}
                              placeholder={t('contact.form.company.placeholder')}
                              autoComplete="organization"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="subject"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-subject">
                              {t('contact.form.subject')}
                            </FieldLabel>
                            <Input
                              {...field}
                              id="contact-subject"
                              aria-invalid={fieldState.invalid}
                              placeholder={t('contact.form.subject.placeholder')}
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="message"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="contact-message">
                              {t('contact.form.message')}
                            </FieldLabel>
                            <InputGroup>
                              <InputGroupTextarea
                                {...field}
                                id="contact-message"
                                placeholder={t('contact.form.message.placeholder')}
                                rows={6}
                                className="min-h-32 resize-none"
                                aria-invalid={fieldState.invalid}
                              />
                              <InputGroupAddon align="block-end">
                                <InputGroupText className="tabular-nums">
                                  {field.value.length}/1000 {language === 'en' ? 'characters' : language === 'fr' ? 'caractères' : language === 'ar' ? 'أحرف' : language === 'es' ? 'caracteres' : 'Zeichen'}
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                              {t('contact.form.message.description')}
                            </FieldDescription>
                            {fieldState.invalid && (
                              <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </form>
                </CardContent>
                <CardFooter>
                  <Field orientation="horizontal" className="w-full flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      className="w-full sm:flex-1"
                    >
                      {t('contact.form.reset')}
                    </Button>
                    <Button
                      type="submit"
                      form="contact-form"
                      className="w-full sm:flex-1"
                    >
                      {t('contact.form.submit')}
                    </Button>
                  </Field>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
