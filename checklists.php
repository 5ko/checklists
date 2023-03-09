<?php if (!defined('PmWiki')) exit();
/**
  Checklist: Ephemeral to-do lists for PmWiki
  Written by (c) Petko Yotov 2017-2023   www.pmwiki.org/Petko

  This text is written for PmWiki; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published
  by the Free Software Foundation; either version 3 of the License, or
  (at your option) any later version. See pmwiki.php for full details
  and lack of warranty.
*/
$RecipeInfo['Checklists']['Version'] = '20230309';

if($action == 'browse')
  $ModuleHeaderFmt[] = "$ModuleDirUrl/checklists.js checklists.css";
