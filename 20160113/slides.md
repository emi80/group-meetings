# ChIPseq Pipelines

### Lab Meeting
<!-- .element: style="margin-top: 1.2em;"-->
------

# Introduction


## Motivation
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
Need for an automated pipeline for processing **ERC** project ``CHiP-seq`` samples


## Former analysis
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel -->
<!-- .element: style="margin-bottom: 1em;"-->
Manual workflow including the following steps:

- mapping with ``GEM``
- fragment length estimation with ``SPP`` (``phantompeaktools``)
- peak calling with ``align2rawsignal`` (a.k.a ``WIGGLER``)


## Drawbacks

- Manual execution
- ``WIGGLER`` requires a specific version of ``MATLAB Runtime`` and is unmantained


<!-- .slide: data-background="rgba(0, 0, 0, 1)" -->
<!-- .element: style="color:#ddd;font-size:2em;" -->
So...
------

# Blueprint


## Workflow

1. [Mapping](#/BlueprintMapping)
2. [Filtering](#/BlueprintFiltering)
3. [Modelling Fragment Size](#/BlueprintModellingFragmentSize)
4. [Peak Calling](#/BlueprintPeakCalling)
5. [Wiggle Plots](#/BlueprintWigglePlots)

------

# ENCODE


## Workflow

1. [Mapping](#/ENCODEMapping)
2. [Filter QC](#/ENCODEFilterQC)
3. [Xcor](#/ENCODEXcor)
4. [SPP](#/ENCODESPP)
5. [MACS2](#/ENCODEMACS2)
6. [IDR](#/ENCODEIDR)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
``BWA`` with default parameters

1. ``bwa aln``
  - max edit distance **0.04**
  - disallow long gaps
  - no trimming
<!-- .element: style="margin-bottom: 0.6em;"-->
2. ``bwa samse``
  - max **3** output alignments


## Filter QC

  - exclude ``FLAG 1804``
    * read unmapped
    * mate unmapped
    * secondary alignments
    * not passing platform quality check
    * PCR or optical duplicates
  - mark duplicates with Picard


## Xcor
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to calculate cross correlation QC scores and to estimate the fragment size

  - create ``tagAlign`` file
  - create ``BEDPE`` file
  - subsample ``tagAlign`` file (15M reads)
  - run ``SPP``


## SPP
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to call peaks

  - call peaks
    * RegionPeaks (``-savr`` option)
  - fix bad coordinates in peak files
    * adjust feature end coordinates that go off the end of the chromosome (``slopBed``)
    * remove any features that are still not within the boundaries of the chromosome (``bedClip``)


## MACS2
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``MACS2`` to call peaks

  - narrow peaks and preliminary signal tracks
  - broad and gapped peaks
  - fold enrichment signal tracks
  - ``-log10(p-value)`` signal tracks
  - bigWigs from beds to support trackhub visualization of peak files


## IDR
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
perform IDR analysis on replicates

  - True Replicates
  - Rep 1 Self-pseudoreplicates
  - Rep 2 Self-pseudoreplicates
  - Pooled Pseudoreplicates

<!-- panel->(green) -->
<!-- .element: style="margin-top: 2em;"-->
final peak calls
------

# Current Implementation
