export type Language = 'en' | 'ja';

import { en_common } from './en/common';
import { ja_common } from './ja/common';
import { en_components_diagnostics } from './en/components/diagnostics';
import { ja_components_diagnostics } from './ja/components/diagnostics';
import { en_components_login } from './en/components/login';
import { ja_components_login } from './ja/components/login';
import { en_components_sensei } from './en/components/sensei';
import { ja_components_sensei } from './ja/components/sensei';
import { en_components_course_selector } from './en/components/course_selector';
import { ja_components_course_selector } from './ja/components/course_selector';
import { en_components_quotation } from './en/components/quotation';
import { ja_components_quotation } from './ja/components/quotation';
import { en_components_notifications } from './en/components/notifications';
import { ja_components_notifications } from './ja/components/notifications';
import { en_components_time_record } from './en/components/time_record';
import { ja_components_time_record } from './ja/components/time_record';
import { en_components_quiz } from './en/components/quiz';
import { ja_components_quiz } from './ja/components/quiz';
import { en_components_roadmap } from './en/components/roadmap';
import { ja_components_roadmap } from './ja/components/roadmap';
import { en_components_practical } from './en/components/practical';
import { ja_components_practical } from './ja/components/practical';
import { en_components_lesson_viewer } from './en/components/lesson_viewer';
import { ja_components_lesson_viewer } from './ja/components/lesson_viewer';
import { en_3d_icad_interface } from './en/3d/icad_interface';
import { ja_3d_icad_interface } from './ja/3d/icad_interface';
import { en_3d_icad_tutorial } from './en/3d/icad_tutorial';
import { ja_3d_icad_tutorial } from './ja/3d/icad_tutorial';
import { en_3d_toolbars } from './en/3d/toolbars';
import { ja_3d_toolbars } from './ja/3d/toolbars';
import { en_3d_origin } from './en/3d/origin';
import { ja_3d_origin } from './ja/3d/origin';
import { en_3d_basic_operation } from './en/3d/basic_operation';
import { ja_3d_basic_operation } from './ja/3d/basic_operation';
import { en_3d_component } from './en/3d/component';
import { ja_3d_component } from './ja/3d/component';
import { en_3d_table } from './en/3d/table';
import { ja_3d_table } from './ja/3d/table';
import { en_3d_2d_to_3d } from './en/3d/2d_to_3d';
import { ja_3d_2d_to_3d } from './ja/3d/2d_to_3d';

export const enTranslations: Record<string, string> = {
  ...en_common,
  ...en_components_diagnostics,
  ...en_components_login,
  ...en_components_sensei,
  ...en_components_course_selector,
  ...en_components_quotation,
  ...en_components_notifications,
  ...en_components_time_record,
  ...en_components_quiz,
  ...en_components_roadmap,
  ...en_components_practical,
  ...en_components_lesson_viewer,
  ...en_3d_icad_interface,
  ...en_3d_icad_tutorial,
  ...en_3d_toolbars,
  ...en_3d_origin,
  ...en_3d_basic_operation,
  ...en_3d_component,
  ...en_3d_table,
  ...en_3d_2d_to_3d,
};

export const jaTranslations: Record<string, string> = {
  ...ja_common,
  ...ja_components_diagnostics,
  ...ja_components_login,
  ...ja_components_sensei,
  ...ja_components_course_selector,
  ...ja_components_quotation,
  ...ja_components_notifications,
  ...ja_components_time_record,
  ...ja_components_quiz,
  ...ja_components_roadmap,
  ...ja_components_practical,
  ...ja_components_lesson_viewer,
  ...ja_3d_icad_interface,
  ...ja_3d_icad_tutorial,
  ...ja_3d_toolbars,
  ...ja_3d_origin,
  ...ja_3d_basic_operation,
  ...ja_3d_component,
  ...ja_3d_table,
  ...ja_3d_2d_to_3d,
};

export const dictionaries = {
  en: enTranslations,
  ja: jaTranslations,
};
