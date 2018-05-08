---
title: "Group Software"
date: "2018-05-09"
aliases: "/5"
layout: reveal
---


# Status


<!-- .slide: data-background-image="dishes.jpg" -->

------
# Compiled software


```bash
# add group binaries to the PATH
export PATH=/software/rg/el6.3/bin
```
<!-- .element: class="big" -->

<svg class="crossover"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg2"
   height="411.02362"
   width="361.41733"
   y="0.0000000"
   x="0.0000000"
   version="1.0">
  <defs
     id="defs3" />
  <g
     id="layer1">
    <path
       id="path2071"
       class="cross"
       d="M 67.553027,20.031343 C 145.39296,122.13989 222.05836,227.05235 285.63995,338.90469 C 296.00882,357.46209 291.01207,348.59938 300.61344,365.50227 L 268.11288,384.13525 C 259.30509,366.79495 263.93311,375.85094 254.21594,356.97386 C 193.39847,244.35606 124.01543,132.93272 33.690987,41.712843 L 67.553027,20.031343 z " />
    <path
       id="path2073"
       class="cross"
       d="M 320.33033,30.043183 C 331.37422,24.144143 341.81984,16.953223 353.46202,12.346053 C 365.00542,7.7779629 337.05502,30.981673 328.80342,40.256843 C 312.63492,58.430943 297.03589,77.089733 281.40539,95.729713 C 236.31259,149.50461 191.67885,203.54708 147.94270,258.43245 C 112.85423,302.61620 75.432087,344.92183 41.391137,389.93474 L 6.5687471,404.86734 C 42.524567,359.89973 80.653447,316.73517 116.64574,271.79799 z " />
  </g>
</svg>

<span class="rfooter"><i class="fa fa-hand-o-right text-info"></i> no `/software/rg/${OS}/bin` to `PATH`</span><!--.slide: data-state="no-nav-bar"-->


## Modules


```bash
# add module paths
if [ "${MODULE_VERSION_STACK:-}" != "" ]; then
  export EASYBUILD_CONFIGFILES=/software/rg/el6.3/EasyBuild/config
  export MODULEPATH=/software/as/el6.5/EasyBuild/modules/all
  module use -a /software/as/el6.3/EasyBuild/software/modules/all
  module use -a /software/as/el6.5/EasyBuild/CRG/modules/all
  module use -a /software/rg/el6.3/EasyBuild/software/modules/all
fi 
```
<!-- .element: class="big" style="font-size: 0.95em;"-->

<svg class="crossover"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg2"
   height="411.02362"
   width="361.41733"
   y="0.0000000"
   x="0.0000000"
   version="1.0">
  <defs
     id="defs3" />
  <g
     id="layer1">
    <path
       id="path2071"
       class="cross"
       d="M 67.553027,20.031343 C 145.39296,122.13989 222.05836,227.05235 285.63995,338.90469 C 296.00882,357.46209 291.01207,348.59938 300.61344,365.50227 L 268.11288,384.13525 C 259.30509,366.79495 263.93311,375.85094 254.21594,356.97386 C 193.39847,244.35606 124.01543,132.93272 33.690987,41.712843 L 67.553027,20.031343 z " />
    <path
       id="path2073"
       class="cross"
       d="M 320.33033,30.043183 C 331.37422,24.144143 341.81984,16.953223 353.46202,12.346053 C 365.00542,7.7779629 337.05502,30.981673 328.80342,40.256843 C 312.63492,58.430943 297.03589,77.089733 281.40539,95.729713 C 236.31259,149.50461 191.67885,203.54708 147.94270,258.43245 C 112.85423,302.61620 75.432087,344.92183 41.391137,389.93474 L 6.5687471,404.86734 C 42.524567,359.89973 80.653447,316.73517 116.64574,271.79799 z " />
  </g>
</svg>


```bash
# config SIT modules and add module path
OS="el7.2"
if [ "${MODULE_VERSION_STACK:-}" != "" ]; then
  export EASYBUILD_CONFIGFILES=/software/rg/${OS}/EasyBuild/config
  export MODULEPATH=/software/as/${OS}/EasyBuild/modules/all
  module use -a /software/as/${OS}/EasyBuild/CRG/modules/all
  module use -a /software/rg/${OS}/EasyBuild/software/modules/all
fi
```
<!-- .element: class="big" style="font-size: 0.95em;"-->

<span><i class="fa fa-hand-o-right text-info"></i> won't be maintained</span><!-- .element: class="rfooter"-->

------
# R


```bash
# add shared R libraries
export R_LIBS=/software/R/packages
```
<!-- .element: class="big" -->


### keep using shared libraries?<!--.element: class="normal-font"-->


### create a group folder for R libraries?<!--.element: class="normal-font"-->

------
# Python<span class=fragment style="color: red;">z</span>


```bash
if [[ -s /software/rg/el6.3/pythonz/etc/bashrc ]]; then
  export PYTHONZ_ROOT=/software/rg/el6.3/pythonz 
  source /software/rg/el6.3/pythonz/etc/bashrc
fi
```
<!-- .element: class="big" style="font-size:1.15em;"-->

<svg class="crossover"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg2"
   height="411.02362"
   width="361.41733"
   y="0.0000000"
   x="0.0000000"
   version="1.0">
  <defs
     id="defs3" />
  <g
     id="layer1">
    <path
       id="path2071"
       class="cross"
       d="M 67.553027,20.031343 C 145.39296,122.13989 222.05836,227.05235 285.63995,338.90469 C 296.00882,357.46209 291.01207,348.59938 300.61344,365.50227 L 268.11288,384.13525 C 259.30509,366.79495 263.93311,375.85094 254.21594,356.97386 C 193.39847,244.35606 124.01543,132.93272 33.690987,41.712843 L 67.553027,20.031343 z " />
    <path
       id="path2073"
       class="cross"
       d="M 320.33033,30.043183 C 331.37422,24.144143 341.81984,16.953223 353.46202,12.346053 C 365.00542,7.7779629 337.05502,30.981673 328.80342,40.256843 C 312.63492,58.430943 297.03589,77.089733 281.40539,95.729713 C 236.31259,149.50461 191.67885,203.54708 147.94270,258.43245 C 112.85423,302.61620 75.432087,344.92183 41.391137,389.93474 L 6.5687471,404.86734 C 42.524567,359.89973 80.653447,316.73517 116.64574,271.79799 z " />
  </g>
</svg>


## VirtualenvWrapper


```bash
if [ -d /software/rg/el6.3/virtualenvs ]; then
  export WORKON_HOME=/software/rg/el6.3/virtualenvs
  LOG_DIR=/tmp/venvwrapper-logs-$USER
  mkdir -p $LOG_DIR
  export VIRTUALENVWRAPPER_LOG_DIR=$LOG_DIR

  VENVWRAP="/usr/bin/virtualenvwrapper.sh"
  [[ -s $VENVWRAP ]] && source $VENVWRAP
fi
```
<!-- .element: class="big" style="font-size:1em;"-->

<svg class="crossover"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg2"
   height="411.02362"
   width="361.41733"
   y="0.0000000"
   x="0.0000000"
   version="1.0">
  <defs
     id="defs3" />
  <g
     id="layer1">
    <path
       id="path2071"
       class="cross"
       d="M 67.553027,20.031343 C 145.39296,122.13989 222.05836,227.05235 285.63995,338.90469 C 296.00882,357.46209 291.01207,348.59938 300.61344,365.50227 L 268.11288,384.13525 C 259.30509,366.79495 263.93311,375.85094 254.21594,356.97386 C 193.39847,244.35606 124.01543,132.93272 33.690987,41.712843 L 67.553027,20.031343 z " />
    <path
       id="path2073"
       class="cross"
       d="M 320.33033,30.043183 C 331.37422,24.144143 341.81984,16.953223 353.46202,12.346053 C 365.00542,7.7779629 337.05502,30.981673 328.80342,40.256843 C 312.63492,58.430943 297.03589,77.089733 281.40539,95.729713 C 236.31259,149.50461 191.67885,203.54708 147.94270,258.43245 C 112.85423,302.61620 75.432087,344.92183 41.391137,389.93474 L 6.5687471,404.86734 C 42.524567,359.89973 80.653447,316.73517 116.64574,271.79799 z " />
  </g>
</svg>

------
# Conda<!-- .element: style="display: none;"-->
![conda](https://conda.io/docs/_images/conda_logo.svg)<!--.element: style="box-shadow:none;"-->


### focused on scientific computation<!-- .element: class="normal-font"-->


[![](https://bioconda.github.io/_images/bioconda.png)<!--.element: style="width: 50%; box-shadow:none;"-->](https://bioconda.github.io/)

more than **3000** bioinformatics packages


### environments with isolated deps<!-- .element: class="normal-font" -->

```bash
$ conda create -n my-env
```
<!-- .element: class="big" style="font-size:1.7em;margin-top: 1em;width: 65%;"-->

```bash
$ conda activate my-env
```
<!-- .element: class="big" style="font-size:1,7em;margin-top: 1em;width: 67%;"-->


### non-Python programs and libraries<!-- .element: class="normal-font" -->

```bash
$ conda install blast
```
<!-- .element: class="big" style="font-size:1.7em;margin-top: 1em;width: 57%;"-->

```bash
$ conda install -c bioconda star
```
<!-- .element: class="big" style="font-size:1.7em;margin-top: 1em;width: 86%;"-->


### binary distributions<!-- .element: class="normal-font" -->
(no compilation required)<!-- .element: class="text-info" -->


### no admin privileges required<!-- .element: class="normal-font" -->


### environment reproducibility<!-- .element: class="normal-font" -->

```bash
$ conda env export -n my-env > my-env.yml
```
<!-- .element: class="big" style="font-size:1.5em;margin-top: 1em;width: 97%;"-->

```bash
$ conda env create -f my-env.yml
```
<!-- .element: class="big" style="font-size:1.5em;margin-top: 1em;width: 76%;"-->


### latest versions of Python 2 and 3<!-- .element: class="normal-font" -->

```bash
$ conda create -n py python=2
```
<!-- .element: class="big" style="font-size:1.5em;margin-top: 1em;width: 69%;position: absolute;top: 50%;left: 14%;"-->

```python
$ conda create -n py python=3
```
<!-- .element: class="big fragment" style="font-size:1.5em;margin-top: 1em;width: 69%;position:absolute;top: 50%;left: 14%;box-shadow: none;"-->

------
<!-- .slide: data-background-image="thank-you.png" data-background-size="50%" data-background-color="#fff" -->
