---
title: "Group Software"
date: "2018-05-09"
aliases: "/5"
outputs: ["Reveal"]
---

{{% section %}}

# Status

---

{{< slide background-image="dishes.jpg" >}}

{{% /section %}}

---

{{% section %}}

# Compiled software

---

```bash
# add group binaries to the PATH
export PATH=/software/rg/el6.3/bin
```

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

<span class="rfooter"><i class="fa fa-hand-o-right text-info"></i> no `/software/rg/${OS}/bin` to `PATH`</span>

---

## Modules

---

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

---

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

<span class="rfooter"><i class="fa fa-hand-o-right text-info"></i> won't be maintained</span>

{{% /section %}}

---

{{% section %}}

# R

---

```bash
# add shared R libraries
export R_LIBS=/software/R/packages
```

---
{{< slide class=normal-font state="no-nav-bar" >}}
### keep using shared libraries?

---

{{< slide class=normal-font state="no-nav-bar" >}}
### create a group folder for R libraries?

{{% /section %}}

---

{{% section %}}

# Python<span class=fragment style="color: red;">z</span>

---

```bash
if [[ -s /software/rg/el6.3/pythonz/etc/bashrc ]]; then
  export PYTHONZ_ROOT=/software/rg/el6.3/pythonz
  source /software/rg/el6.3/pythonz/etc/bashrc
fi
```

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

---

## VirtualenvWrapper

---

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

{{% /section %}}

---

{{% section %}}

{{< slide id=conda >}}
# Conda
![conda](https://conda.io/docs/_images/conda_logo.svg)

---

{{< slide class=normal-font >}}
### focused on scientific computation

---
{{< slide id=bioconda >}}

![](https://bioconda.github.io/_images/bioconda.png)

more than **3000** bioinformatics packages

---

{{< slide class=normal-font >}}
### environments with isolated deps

```bash
$ conda create -n my-env
```

```bash
$ conda activate my-env
```

---

{{< slide class=normal-font >}}
### non-Python programs and libraries

```bash
$ conda install blast
```

```bash
$ conda install -c bioconda star
```

---

{{< slide id=conda-binary class=normal-font >}}
### binary distributions
(no compilation required)

---

{{< slide class=normal-font >}}
### no admin privileges required

---

{{< slide class=normal-font >}}
### environment reproducibility

```bash
$ conda env export -n my-env > my-env.yml
```

```bash
$ conda env create -f my-env.yml
```

---

{{< slide class=normal-font >}}
### latest versions of Python `2` and 3

```bash
$ conda create -n py python=2
```

---

{{< slide class=normal-font >}}
### latest versions of Python 2 and `3`

```bash
$ conda create -n py python=3
```


{{% /section %}}

---

{{< slide background-image="thank-you.png" background-size="50%" background-color="#fff">}}
