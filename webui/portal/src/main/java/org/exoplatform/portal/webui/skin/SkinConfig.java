/*
 * Copyright (C) 2003-2007 eXo Platform SAS.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 */
package org.exoplatform.portal.webui.skin;

/**
 * Created by The eXo Platform SAS
 * Jan 19, 2007  
 */
public class SkinConfig {
  private String module_ ;
  private String cssPath_ ;
  private String id_ ;

  public SkinConfig(String module, String cssPath) {
    module_ = module;
    cssPath_ = cssPath;
    id_  = module.replace('/', '_') ;
  }
  
  public String getId() { return id_ ; }
  public String getModule(){ return module_; }
  public String getCSSPath(){ return cssPath_; }
}