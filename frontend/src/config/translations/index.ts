import { en_2d_common } from './en/2d/common';
import { ja_2d_common } from './ja/2d/common';
import { en_3d_annotation } from './en/3d/annotation';
import { ja_3d_annotation } from './ja/3d/annotation';
import { en_3d_fairing } from './en/3d/fairing';
import { ja_3d_fairing } from './ja/3d/fairing';
import { en_3d_holedetails } from './en/3d/holedetails';
import { ja_3d_holedetails } from './ja/3d/holedetails';
import { en_3d_materialsetting } from './en/3d/materialsetting';
import { ja_3d_materialsetting } from './ja/3d/materialsetting';
import { en_3d_mirroredpart } from './en/3d/mirroredpart';
import { ja_3d_mirroredpart } from './ja/3d/mirroredpart';
import { en_3d_operationsample } from './en/3d/operationsample';
import { ja_3d_operationsample } from './ja/3d/operationsample';
import { en_3d_parasolid } from './en/3d/parasolid';
import { ja_3d_parasolid } from './ja/3d/parasolid';
import { en_3d_part } from './en/3d/part';
import { ja_3d_part } from './ja/3d/part';
import { en_3d_properties } from './en/3d/properties';
import { ja_3d_properties } from './ja/3d/properties';
import { en_3d_purchaseparts } from './en/3d/purchaseparts';
import { ja_3d_purchaseparts } from './ja/3d/purchaseparts';
import { en_3d_standard } from './en/3d/standard';
import { ja_3d_standard } from './ja/3d/standard';
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
import { en_3d_common } from './en/3d/common';
import { en_3d_component } from './en/3d/component';
import { ja_3d_common } from './ja/3d/common';
import { ja_3d_component } from './ja/3d/component';
import { en_3d_table } from './en/3d/table';
import { ja_3d_table } from './ja/3d/table';
import { en_3d_2d_to_3d } from './en/3d/2d_to_3d';
import { ja_3d_2d_to_3d } from './ja/3d/2d_to_3d';
import { en_3d_boolean } from './en/3d/boolean';
import { ja_3d_boolean } from './ja/3d/boolean';

export const enTranslations: Record<string, string> = {
  ...en_3d_annotation,
  ...en_3d_fairing,
  ...en_3d_holedetails,
  ...en_3d_materialsetting,
  ...en_3d_mirroredpart,
  ...en_3d_operationsample,
  ...en_3d_parasolid,
  ...en_3d_part,
  ...en_3d_properties,
  ...en_3d_purchaseparts,
  ...en_3d_standard,

  ...en_2d_common,
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
  ...en_3d_common,
  ...en_3d_component,
  ...en_3d_table,
  ...en_3d_2d_to_3d,
  ...en_3d_boolean,
};

export const jaTranslations: Record<string, string> = {
  ...ja_3d_annotation,
  ...ja_3d_fairing,
  ...ja_3d_holedetails,
  ...ja_3d_materialsetting,
  ...ja_3d_mirroredpart,
  ...ja_3d_operationsample,
  ...ja_3d_parasolid,
  ...ja_3d_part,
  ...ja_3d_properties,
  ...ja_3d_purchaseparts,
  ...ja_3d_standard,

  ...ja_2d_common,
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
  ...ja_3d_common,
  ...ja_3d_component,
  ...ja_3d_table,
  ...ja_3d_2d_to_3d,
  ...ja_3d_boolean,
};

export const dictionaries = {
  en: enTranslations,
  ja: jaTranslations,
};
