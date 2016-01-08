# ChIPseq Pipelines

### Lab Meeting
<!-- .element: style="margin-top: 1.2em;"-->
------

# OLD pipeline

------

# ENCODE


## Workflow

1. [Mapping](#/Mapping)
2. [Filter QC](#/FilterQC)
3. [Xcor](#/Xcor)
4. [SPP](#/SPP)
5. [MACS2](#/MACS2)
6. [IDR](#/IDR)


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

# Nextflow
